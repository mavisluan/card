import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Set} from "../models/Set";
import {Card} from "../models/Card";

// set header for post request
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class SetService {
  // API call url
  apiUrl: string = '/api/sets';
  // inject HttpClient
  constructor(private http: HttpClient) { }
  // HttpClient return Observable
  // API call--get request
  getSets(): Observable<Set[]> {
    return this.http.get<Set[]>(this.apiUrl);
  }

  getSetsByName(topic): Observable<Set[]> {
    const url = `${this.apiUrl}/search/${topic}`;
    return this.http.get<Set[]>(url);
  }
  // API call -- post request
  addSet(set: Set): Observable<Set> {
    return this.http.post<Set>(this.apiUrl, set, httpOptions);
  }

  updateSet(targetSet: Set): Observable<Set> {
    const url = `${this.apiUrl}/${targetSet._id}`;
    return this.http.patch<Set>(url, targetSet, httpOptions);
  }

  removeSet(id: string): Observable<Set> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Set>(url, httpOptions);
  }

  getSet(id: string): Observable<Set> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Set>(url);
  }

  // addCardToSet(setId, card: Card): Observable<Set> {
  //   const url = `${this.apiUrl}/${setId}/cards`;
  //   console.log(`url: ${url}`)
  //   return this.http.patch<Set>(url, card, httpOptions);
  // }

  removeCardFromSet(setId, cardId): Observable<Set> {
    const url = `${this.apiUrl}/${setId}/cards/${cardId}/delete`;
    console.log(`url: ${url}`)
    return this.http.delete<Set>(url, httpOptions);
  }

  toggleCardStar(setId, cardId): Observable<Set> {
    const url = `${this.apiUrl}/${setId}/cards/${cardId}/star`;
    return this.http.patch<Set>(url, httpOptions);
  }
}
