import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: roleLoading } = useQuery({ 
        queryKey: ['role', user?.email],
        queryFn: async () => { 
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data?.role;
        },
        enabled: !!user?.email
    })
    return { role, roleLoading};
};

export default useRole;