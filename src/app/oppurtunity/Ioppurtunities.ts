export class Oppurtunities {
    access_token: String;
    title: String;
    applications_close_date: Date;
    earliest_start_date: Date;
    latest_end_date: Date;
    description: String;
    backgrounds;
    skills;
    selection_process: String;
    salary: Number;
    role_info = {
        "city": ""
    };

    constructor() {
        this.title = "";
        this.applications_close_date;
        this.earliest_start_date;
        this.latest_end_date;
        this.description = "";
        this.backgrounds;
        this.skills;
        this.selection_process = "";
        this.salary;
        this.role_info.city = "";
    }
}