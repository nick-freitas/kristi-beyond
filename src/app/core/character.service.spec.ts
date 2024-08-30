import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { provideExperimentalCheckNoChangesForDebug } from '@angular/core';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calcProficiencyModifier', () => {
    it('works', () => {
      expect(service.calcProficiencyModifier(1)).toBe(2);
      expect(service.calcProficiencyModifier(2)).toBe(2);
      expect(service.calcProficiencyModifier(3)).toBe(2);
      expect(service.calcProficiencyModifier(4)).toBe(2);

      expect(service.calcProficiencyModifier(5)).toBe(3);
      expect(service.calcProficiencyModifier(6)).toBe(3);
      expect(service.calcProficiencyModifier(7)).toBe(3);
      expect(service.calcProficiencyModifier(8)).toBe(3);

      expect(service.calcProficiencyModifier(9)).toBe(4);
      expect(service.calcProficiencyModifier(10)).toBe(4);
      expect(service.calcProficiencyModifier(11)).toBe(4);
      expect(service.calcProficiencyModifier(12)).toBe(4);

      expect(service.calcProficiencyModifier(13)).toBe(5);
      expect(service.calcProficiencyModifier(14)).toBe(5);
      expect(service.calcProficiencyModifier(15)).toBe(5);
      expect(service.calcProficiencyModifier(16)).toBe(5);

      expect(service.calcProficiencyModifier(17)).toBe(6);
      expect(service.calcProficiencyModifier(18)).toBe(6);
      expect(service.calcProficiencyModifier(19)).toBe(6);
      expect(service.calcProficiencyModifier(20)).toBe(6);
    });
  });

  describe('calcModifier', () => {
    it('returns 0 for 10 and 11', () => {
      expect(service.calcModifier(10)).toBe(0);
      expect(service.calcModifier(11)).toBe(0);
    });

    it('returns positive for 12+', () => {
      expect(service.calcModifier(12)).toBe(1);
      expect(service.calcModifier(13)).toBe(1);
      expect(service.calcModifier(14)).toBe(2);
      expect(service.calcModifier(15)).toBe(2);
      expect(service.calcModifier(16)).toBe(3);
      expect(service.calcModifier(17)).toBe(3);
      expect(service.calcModifier(18)).toBe(4);
      expect(service.calcModifier(19)).toBe(4);
      expect(service.calcModifier(20)).toBe(5);
    });

    it('returns negative for 9-', () => {
      expect(service.calcModifier(9)).toBe(-1);
      expect(service.calcModifier(8)).toBe(-1);
      expect(service.calcModifier(7)).toBe(-2);
      expect(service.calcModifier(6)).toBe(-2);
      expect(service.calcModifier(5)).toBe(-3);
      expect(service.calcModifier(4)).toBe(-3);
      expect(service.calcModifier(3)).toBe(-4);
      expect(service.calcModifier(2)).toBe(-4);
      expect(service.calcModifier(1)).toBe(-5);
      expect(service.calcModifier(0)).toBe(-5);
    });
  });
});
