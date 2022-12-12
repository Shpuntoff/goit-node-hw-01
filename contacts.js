import fs from 'fs/promises';
import { resolve } from 'path';
import { nanoid } from "nanoid"

const contactsPath = resolve('./db/contacts.json');


// TODO: задокументувати кожну функцію
async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (err) {
        console.error(err)
    };
};

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contactsResult = contacts.find(({ id }) => id === contactId);
        return contactsResult;
    } catch (err) {
         console.error(err)
    };
};

async function removeContact(contactId) {
    try {
        const contacts= await listContacts();
        const allContacts = contacts.filter(({ id }) => id !== contactId);
      resultUpd(allContacts);
        return contacts.filter(({ id }) => id === contactId);

 } catch(err){
    console.error(err)
    };
};
async function resultUpd(result) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err);
  }
}

async function addContact({name, email, phone}) {
    try {
        const contacts = await listContacts();
        const newContacts = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContacts);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContacts;
 } catch(err){
    console.error(err)
    };
};

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
