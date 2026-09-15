import { notFound, redirect } from "next/navigation";
import UserForm from "../../UserForm";
import { getuserById, updateUser } from "../../../services/user.service";

interface Props {
	params: Promise<{ id: string }>;
}

const EditUserPage = async ({ params }: Props) => {
	const { id: idParam } = await params;
	const id = Number(idParam);

	if (!Number.isInteger(id)) {
		notFound();
	}

	const user = await getuserById(id);

	if (!user) {
		notFound();
	}

	async function editUser(formData: FormData) {
		"use server";

		const name = String(formData.get("name") ?? "").trim();
		const geburtstag = new Date(String(formData.get("geburtstag") ?? ""));
		const istVergeben = formData.get("istVergeben") === "on";

		if (!name || Number.isNaN(geburtstag.getTime())) {
			throw new Error("Ungültige Benutzerdaten");
		}

		await updateUser(id, name, geburtstag, istVergeben);
		redirect(`/`);
	}

	return (
		<main>
			<h1>Benutzer bearbeiten</h1>
			<UserForm action={editUser} user={user} />
		</main>
	);
}

export default EditUserPage