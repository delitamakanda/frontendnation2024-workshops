import { Component, inject } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Contact} from "../contact.model";
import { ContactsStore } from '../contacts.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact-page',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './add-contact-page.component.html',
  styleUrl: './add-contact-page.component.css'
})
export class AddContactPageComponent {
  protected contact = {name: "", email: "", company: ""}
  protected contactStore = inject(ContactsStore);
  private router = inject(Router);

  onSubmit() {
    this.contactStore.add(this.contact);
    this.router.navigateByUrl("/contacts");
  }
}
