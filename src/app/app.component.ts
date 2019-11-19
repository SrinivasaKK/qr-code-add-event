import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  baseUrl =
    "https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE";
  addEventUrl;
  displayCode = false;
  submitted = false;
  eventForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: [""],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      fromTime: ["", Validators.required],
      toTime: ["", Validators.required],
      location: [""],
      description: [""]
    });
  }

  get f() {
    return this.eventForm.controls;
  }

  generateQrCode() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    } else {
      console.log(this.eventForm.value);

      const fromYear = this.eventForm.value.fromDate.year;
      const fromMonth = this.eventForm.value.fromDate.month;
      const fromDay = this.eventForm.value.fromDate.day;
      const toYear = this.eventForm.value.toDate.year;
      const toMonth = this.eventForm.value.toDate.month;
      const toDay = this.eventForm.value.toDate.day;
      const fromTime = this.eventForm.value.fromTime.replace(":", "");
      const toTime = this.eventForm.value.toTime.replace(":", "");
      const location = this.eventForm.value.location;
      const title = this.eventForm.value.title;
      const description = this.eventForm.value.description;

      const dates = `${fromYear}${fromMonth}${fromDay}T${fromTime}Z/${toYear}${toMonth}${toDay}T${toTime}Z`;
      this.displayQrCode(dates, title, location, description);
    }
  }

  displayQrCode(dates, title, location, description) {
    this.displayCode = true;

    this.addEventUrl = `${this.baseUrl}&text=${title}&dates=${dates}&details=${description}&location=${location}&sf=true&output=xml`;
    console.log(this.addEventUrl);
  }

  displayForm() {
    this.displayCode = false;
  }
}
