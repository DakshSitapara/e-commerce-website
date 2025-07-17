"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type ShippingFormData = {
  type: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: ShippingFormData | null;
  existingTypes: string[];
  onSave: (data: ShippingFormData) => Promise<void>;
}

export function ShippingFormDialog({
  open,
  onClose,
  initialData = null,
  existingTypes,
  onSave,
}: Props) {
  const isEdit = Boolean(initialData);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormData>();

  useEffect(() => {
    reset(
      initialData ?? {
        type: "",
        address: "",
        city: "",
        country: "",
        phoneNumber: "",
      }
    );
  }, [initialData, open, reset]);

  const submit = async (data: ShippingFormData) => {
    await onSave({
      ...data,
      type: isEdit ? initialData!.type : data.type, 
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg text-center">
              {isEdit
                ? `Edit Address - ${initialData?.type}`
                : "Add New Address"}
            </DialogTitle>
          </DialogHeader>

           
          {!isEdit && <div className="space-y-2">
            <Label>Type</Label>
            <Input
              {...register("type", {
                required: "Type is required",
                validate: (val) =>
                  !existingTypes.map((t) => t.toLowerCase()).includes(val.toLowerCase()) ||
                  "This type already exists.",
              })}
            />
            {errors.type && (
              <p className="text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>
        }

          <div className="space-y-1">
            <Label>Phone</Label>
            <Input
              {...register("phoneNumber", {
                required: "Phone is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Address</Label>
            <Input
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>City</Label>
            <Input
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Country</Label>
            <Input
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && (
              <p className="text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : isEdit
                ? "Update Address"
                : "Add Address"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
