import { TestBed } from '@angular/core/testing';

import { LOCAL_DICE_RANDOM, LocalDiceService } from './local-dice.service';

describe('LocalDiceService', () => {
  let randomValues: number[];
  let service: LocalDiceService;

  beforeEach(() => {
    randomValues = [];
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LOCAL_DICE_RANDOM,
          useValue: () => randomValues.shift() ?? 0,
        },
      ],
    });
    service = TestBed.inject(LocalDiceService);
  });

  it('applies positive and negative modifiers to d20 rolls', () => {
    randomValues.push(0.45, 0.95);

    const positive = service.rollD20('Perception', 4, 'normal');
    const negative = service.rollD20('Strength', -2, 'normal');

    expect(positive.allDice).toEqual([10]);
    expect(positive.keptDice).toEqual([10]);
    expect(positive.modifier).toBe(4);
    expect(positive.total).toBe(14);
    expect(positive.notation).toBe('1d20 + 4');

    expect(negative.allDice).toEqual([20]);
    expect(negative.modifier).toBe(-2);
    expect(negative.total).toBe(18);
    expect(negative.notation).toBe('1d20 - 2');
  });

  it('keeps the higher d20 roll with advantage', () => {
    randomValues.push(0.1, 0.8);

    const result = service.rollD20('Initiative', 3, 'advantage');

    expect(result.allDice).toEqual([3, 17]);
    expect(result.keptDice).toEqual([17]);
    expect(result.total).toBe(20);
    expect(result.mode).toBe('advantage');
  });

  it('keeps the lower d20 roll with disadvantage', () => {
    randomValues.push(0.7, 0.2);

    const result = service.rollD20('Wisdom save', 6, 'disadvantage');

    expect(result.allDice).toEqual([15, 5]);
    expect(result.keptDice).toEqual([5]);
    expect(result.total).toBe(11);
    expect(result.mode).toBe('disadvantage');
  });

  it('rolls a simple damage expression', () => {
    randomValues.push(0, 0.5, 0.99);

    const result = service.rollExpression('Fire damage', '3d6 + 2');

    expect(result).not.toBeNull();
    expect(result?.allDice).toEqual([1, 4, 6]);
    expect(result?.keptDice).toEqual([1, 4, 6]);
    expect(result?.modifier).toBe(2);
    expect(result?.total).toBe(13);
    expect(result?.notation).toBe('3d6 + 2');
    expect(result?.mode).toBe('normal');
  });

  it('rejects invalid notation without changing history', () => {
    service.rollD20('Existing roll', 0, 'normal');
    const historyBefore = service.recentHistory();

    expect(service.rollExpression('Bad roll', '2d6 plus 4')).toBeNull();
    expect(service.rollExpression('Bad roll', '0d6')).toBeNull();
    expect(service.recentHistory()).toEqual(historyBefore);
  });

  it('stores newest rolls first, caps history, and clears it', () => {
    for (let index = 1; index <= 21; index += 1) {
      service.rollD20(`Roll ${index}`, 0, 'normal');
    }

    expect(service.recentHistory().length).toBe(20);
    expect(service.recentHistory()[0].label).toBe('Roll 21');
    expect(service.recentHistory()[19].label).toBe('Roll 2');

    service.clearHistory();

    expect(service.recentHistory()).toEqual([]);
  });
});
