"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import HanziFormDialogContent from "./HanziFormDialogContent";

const HanziForm = ({ form }: { form: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="ghost"
          size="sm"
          className=" flex items-center gap-1 text-destructive"
        >
          <div>新規登録</div>
          <Plus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <HanziFormDialogContent form={form} />
      </DialogContent>
    </Dialog>
  );
};

export default HanziForm;
