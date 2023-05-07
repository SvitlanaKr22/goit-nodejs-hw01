const { program } = require("commander");
const { listContacts } = require("./contacts");
const { getContactById } = require("./contacts");
const { addContact } = require("./contacts");
const { removeContact } = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts, ["name", "phone", "email"]);
        break;
      case "get":
        const contact = await getContactById(id);
        console.log(contact);
        break;
      case "add":
        const newContact = await addContact({ name, email, phone });
        console.log(newContact);
        break;
      case "remove":
        const remoteContact = await removeContact(id);
        console.log(remoteContact);
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log("File error:", error.message);
  }
}

program
  .option("-a  --action, <type> ", "choose action")
  .option("-i --id, <type>", "user id")
  .option("-n --name, <type>", "user name")
  .option("-p --phone, <type>", "user email")
  .option("-e --email , <type>", "user phone");
program.parse();

const options = program.opts();

invokeAction(options);
