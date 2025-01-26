'use client';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const PasswordChangeForm = () => {
    const router = useRouter();
    const [isFormBtnLoading, setIsFormBtnLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();

    const onSubmit = async (data: { email: string }) => {
        setIsFormBtnLoading(true);
        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);
            setIsFormBtnLoading(false);
            toast.success("Password reset link sent to your email.");
            router.push("/login");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error.message || "Something went wrong!");
        }
    };

    return (
        <>
            <h1 className="mb-5 text-center text-lg font-semibold leading-none text-gray-900">Forgot Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-field mb-4">
                    <label className="mb-1 text-sm text-gray-600 dark:text-gray-50" htmlFor="email">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <InputText
                        className="tu-input"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Email is required',
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <span className="text-sm text-red-500">{message}</span>}
                    />
                </div>

                <Button
                    type='submit'
                    label="Submit"
                    className="primary-btn w-full"
                    disabled={isFormBtnLoading}
                    loading={isFormBtnLoading}
                />
            </form>
        </>
    );
};

export default PasswordChangeForm;