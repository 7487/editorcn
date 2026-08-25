"use client";

import { useRichTextEditorContext } from "@editorcn/editor";
import { Grid3x3 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const InsertTableDialog = () => {
  const { editor } = useRichTextEditorContext();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [withHeaderRow, setWithHeaderRow] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editor?.chain().focus().insertTable({ cols, rows, withHeaderRow }).run();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Grid3x3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Table</DialogTitle>
          <DialogDescription>
            Choose the number of rows and columns.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <label
              className="flex flex-col gap-1.5"
              htmlFor="insert-table-rows"
            >
              <span className="text-xs text-muted-foreground">Rows</span>
              <Input
                id="insert-table-rows"
                type="number"
                min={1}
                max={10}
                value={rows}
                onChange={(e) =>
                  setRows(Number.parseInt(e.target.value, 10) || 1)
                }
                className="w-20"
              />
            </label>
            <label
              className="flex flex-col gap-1.5"
              htmlFor="insert-table-cols"
            >
              <span className="text-xs text-muted-foreground">Columns</span>
              <Input
                id="insert-table-cols"
                type="number"
                min={1}
                max={10}
                value={cols}
                onChange={(e) =>
                  setCols(Number.parseInt(e.target.value, 10) || 1)
                }
                className="w-20"
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={withHeaderRow}
              onChange={(e) => setWithHeaderRow(e.target.checked)}
              className="h-4 w-4"
            />
            Include header row
          </label>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Insert</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
