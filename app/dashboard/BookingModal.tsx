import { Button } from "@/ui/atoms/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/ui/atoms/dialog";
import { Field, Label } from "@/ui/atoms/fieldset";
import { Input } from "@/ui/atoms/input";
import { Textarea } from "@/ui/atoms/textarea";
import Calendar from "@/ui/atoms/calendar";
export default function BookingModal({
  isOpen,
  handleModalState,
}: {
  isOpen: boolean;
  handleModalState: () => void;
}) {
  return (
    <>
      <Dialog open={isOpen} size='5xl' onClose={() => {}}>
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogDescription>
          Please fill in all the required details to schedule a meeting.
        </DialogDescription>
        <DialogBody>
            <Calendar />
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Type an email address"
            />
            <div className="mt-8">
              <Label>
                Description
                <span className="text-gray-500">(Optional)</span>
              </Label>
              <Textarea name="description" />
            </div>
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => handleModalState()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
