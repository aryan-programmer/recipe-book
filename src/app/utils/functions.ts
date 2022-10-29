import {FormGroup} from "@angular/forms";

export function passwordsMatch(controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		let control = formGroup.controls[controlName];
		let matchingControl = formGroup.controls[matchingControlName]
		if (
			matchingControl.errors &&
			!matchingControl.errors.passwordsMatch
		) {
			return;
		}
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ passwordsMatch: true });
		} else {
			matchingControl.setErrors(null);
		}
	};
};
