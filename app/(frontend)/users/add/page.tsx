import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CreateUser } from "../../../services/user.service";
import Header from "../../Header";
import UserForm from "../../UserForm";

export const runtime = 'nodejs'

async function addUser(formData: FormData) {
	"use server";

	const name = String(formData.get("name") ?? "").trim();
	const geburtstagValue = String(formData.get("geburtstag") ?? "");
	const istVergeben = formData.get("istVergeben") === "on";

	if (!name || !geburtstagValue) {
		throw new Error("Name and birthday are required.");
	}

	await CreateUser(name, new Date(geburtstagValue), istVergeben);
	revalidatePath("/users");
	redirect(`/users`);
}

export default function AddUserPage() {
	return (
		<>
			<Header>Add a User</Header>
			<UserForm action={addUser} />
		</>
	);
}

