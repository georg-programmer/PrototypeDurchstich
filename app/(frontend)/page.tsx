import { getAllUsers } from "@/app/services/user.service";
import Header from "./Header";

const IndexPage = async () => {

    const users = await getAllUsers();

	return  (<Header>Welcome!</Header>)
    
};

export default IndexPage;
