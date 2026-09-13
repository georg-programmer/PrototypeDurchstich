import { CreateUser } from "../../../services/user.service";
import Header from "../../Header";
import UserForm from "../../UserForm";

async function addUser(formData: FormData) {
	"use server";

	const name = String(formData.get("name") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const geburtstagValue = String(formData.get("geburtstag") ?? "");
	const istVergeben = formData.get("istVergeben") === "on";

	if (!name || !geburtstagValue || !email) {
		throw new Error("Name, Email und Geburtstag sind erforderlich.");
	}

	await CreateUser(name, new Date(geburtstagValue), istVergeben);
}

export default function AddUserPage() {
	return (
		<>
			<Header>Add a User</Header>
			<UserForm action={addUser} />
		</>
	);
}

