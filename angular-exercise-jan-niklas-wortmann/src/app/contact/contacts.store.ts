import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import { Contact } from './contact.model';
import {addEntity, setAllEntities, updateEntity, withEntities} from "@ngrx/signals/entities";
import {computed, inject, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, concatMap, exhaustMap, Observable, of, pipe, tap} from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export const dummy_contact: Contact = {id: "1", company: "Some Company", email: "some@company.com", name: "Some Name", photo: "https://flowbite.com/docs/images/people/profile-picture-3.jpg"}

export const ContactsStore = signalStore(
  { providedIn: 'root' },
  withEntities<Contact>(),
  withState<{ searchTerm: string}>({ searchTerm: "" }),
  withComputed((store) => ({
    searchResults: computed(() => {
      const searchQuery = store.searchTerm();
    if (searchQuery) {
      return store.entities().filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
    } else {
      return store.entities()
    }
    })
  })),
  withMethods((store) => {
    const contactDataService = inject(ContactDataService);

    return {
      search: (searchTerm: string) => {
        patchState(store, { searchTerm })
      },
      load: rxMethod<void>(
        pipe(
          exhaustMap(_ => contactDataService.getContacts()),
          tap(contacts => {
              patchState(store, setAllEntities(contacts))
          })
        )
      ),
      add: rxMethod<Pick<Contact, "name" | "company" | "email">>(
        pipe(
          exhaustMap(contact => contactDataService.createContact(contact)),
          tap(contact => {
            if (!contact) {
              return;
            }
            patchState(store, addEntity(contact))
          })
        )
      ),
      edit: rxMethod<Contact>(
        pipe(
          concatMap(contact => contactDataService.updateContact(contact)),
          tap(contact => {
            patchState(store, updateEntity({ id: contact.id , changes: contact}))
          })
        )
      )
    }
  }),
  withHooks({ onInit: (store) => store.load() })
);

@Injectable({providedIn: "root"})
export class ContactDataService {

  private http = inject(HttpClient);

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>("http://localhost:3000/contacts").pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    )
  }

  public createContact(_contact: Pick<Contact, "name" | "company" | "email">): Observable<Contact | undefined> {
    const contact = {
      "age": 23,
      "gender": "male",
      "photo": "https://randomuser.me/api/portraits/men/50.jpg",
      ..._contact
    };
    return this.http.post<Contact>("http://localhost:3000/contacts", contact).pipe(
      catchError((error) => {
        console.error(error);
        return of(undefined);
      })
    )
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>("http://localhost:3000/contacts/"+contact.id, contact).pipe(
      catchError((error) => {
        console.error(error);
        return of(contact);
      })
    )
  }
}
