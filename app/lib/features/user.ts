import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAction } from "../api-service";
import { UserProfile } from '@/app/lib/model/user-profile-model'

const dataUser: UserProfile =
{
    user: {
        id: 0,
        email: '',
        password: '',
    },
    name: '',
    profile: {
        id: 0,
        firstname: '',
        lastname: '',
        mobilphone: '',
        address: '',
        age: 0,
    },
    company: {
        id: 0,
        name: '',
        rif: '',
        addres: '',
        numberphone: '',
        member: [],
        invoice: []
    },
    member: {
        id: 0,
        planId: 0,
    },
    plan: {
        id: 0,
        name: '',
        description: '',
        cost: 0,
        credits: 0,
        bots: 0,
        documents: 0,
        members: 0,
        member: []
    }
}


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const email = localStorage.getItem('userEmail');
        const response = await axiosAction.get(`users/email/${email}`)
        const { Profile, Member, ...user } = response.data.data ?? null
        const dataU: UserProfile = {
            user: user,
            name: '',
            profile: Profile,
            company: Member.company,
            member: Member
        }
        return dataU || 'Email del usuario no existe';
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        dataUser,
        status: 'idle',
        error: null
    },
    reducers: {
        setUserProfile: (state, action) => {
            return {
                ...state,
                dataUser: action.payload,
            };
        },
        getUserProfile: (state) => {
            return {
                ...state,
                dataUser: state.dataUser,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dataUser = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                //state.error = action;
            });
    },
});

export const { setUserProfile, getUserProfile } = userSlice.actions;
export default userSlice.reducer;