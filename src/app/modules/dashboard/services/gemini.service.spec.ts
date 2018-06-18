import { TestBed, inject } from "@angular/core/testing";

import { GeminiService } from "./gemini.service";

describe("GeminiService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeminiService]
    });
  });

  it("should be created", inject([GeminiService], (service: GeminiService) => {
    expect(service).toBeTruthy();
  }));
});
