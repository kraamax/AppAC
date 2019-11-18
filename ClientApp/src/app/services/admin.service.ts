import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class AdminService {
  isAdmin = new Subject<boolean>();

  constructor() {}

  setAdminLoggedIn() {
    sessionStorage.setItem("isAdminLoggedIn", JSON.stringify(true));
    this.isAdmin.next(true);
  }
  getAdminLoggedIn(): boolean {
    var isAdminLoggedIn = JSON.parse(sessionStorage.getItem("isAdminLoggedIn"));

    if (isAdminLoggedIn != null && isAdminLoggedIn == true) {
      this.isAdmin.next(true);
      return true;
    } else {
      this.isAdmin.next(false);
      return false;
    }
  }
  logoutAdmin() {
    sessionStorage.clear();
    this.isAdmin.next(false);
  }
}
