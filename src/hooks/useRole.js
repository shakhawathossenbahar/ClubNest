import { useContext } from "react"
import { AuthContext } from "../provider/authProvider"
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query"

const useRole = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { isLoading, data: role = 'member' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res?.data?.role
        }
    })
    return { isLoading, role }
}

export default useRole;