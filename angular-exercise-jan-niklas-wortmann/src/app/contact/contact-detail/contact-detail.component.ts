import {Component, computed, inject, input } from "@angular/core"
import {ContactsStore, dummy_contact} from "../contacts.store";
import {FormsModule, NgForm} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "../contact.model";

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  private contactStore = inject(ContactsStore);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public contactId = this.activatedRoute.snapshot.paramMap.get("id") as string;
  // TODO: voir pour ce qu'on peut faire avec un input.required<string>
  public id = input.required<string>();

  protected contact = computed(() => {
    return this.contactStore.entityMap()[this.contactId] ;
  });

  onSubmit(form: NgForm) {
    const contact = {...this.contact(),...form.value} as Contact;
    this.contactStore.edit(contact);
    this.router.navigateByUrl("/contacts");
  }

}
