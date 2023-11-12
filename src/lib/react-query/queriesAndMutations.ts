import {
  useMutation, useQueryClient, // MODd data
} from "@tanstack/react-query";
import { createUserAccount, signInAccount, signOutAccount, createPost, } from "../appwrite/api";
import { INewPost, INewUser } from "@/types";



export const userCreateUserAccount = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),

    });

}

export const useSignInAccount = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user),

    });

};


export const useSignOutAccount = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: signOutAccount

    });

}


export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };