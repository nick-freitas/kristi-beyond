import {
  inject,
  Injectable,
  InjectionToken,
  Signal,
  signal,
} from '@angular/core';

export type RollMode = 'normal' | 'advantage' | 'disadvantage';

export interface LocalRollResult {
  readonly id: string;
  readonly label: string;
  readonly notation: string;
  readonly allDice: readonly number[];
  readonly keptDice: readonly number[];
  readonly modifier: number;
  readonly total: number;
  readonly mode: RollMode;
  readonly timestamp: number;
}

type DiceRandom = () => number;

export const LOCAL_DICE_RANDOM = new InjectionToken<DiceRandom>(
  'LOCAL_DICE_RANDOM',
  {
    providedIn: 'root',
    factory: () => Math.random,
  },
);

const HISTORY_LIMIT = 20;
const MAX_DICE_PER_ROLL = 100;

@Injectable({
  providedIn: 'root',
})
export class LocalDiceService {
  private readonly random = inject(LOCAL_DICE_RANDOM);
  private readonly history = signal<readonly LocalRollResult[]>([]);
  private nextId = 1;

  readonly recentHistory: Signal<readonly LocalRollResult[]> =
    this.history.asReadonly();

  rollD20(label: string, modifier: number, mode: RollMode): LocalRollResult {
    const allDice = [this.rollDie(20)];
    if (mode !== 'normal') {
      allDice.push(this.rollDie(20));
    }

    const keptValue =
      mode === 'advantage'
        ? Math.max(...allDice)
        : mode === 'disadvantage'
          ? Math.min(...allDice)
          : allDice[0];

    return this.record({
      label,
      notation: this.formatNotation(1, 20, modifier),
      allDice,
      keptDice: [keptValue],
      modifier,
      total: keptValue + modifier,
      mode,
    });
  }

  rollExpression(label: string, notation: string): LocalRollResult | null {
    const match = notation.match(
      /^\s*(\d+)\s*d\s*(\d+)(?:\s*([+-])\s*(\d+))?\s*$/i,
    );
    if (!match) return null;

    const count = Number(match[1]);
    const sides = Number(match[2]);
    const unsignedModifier = Number(match[4] ?? 0);
    const modifier = match[3] === '-' ? -unsignedModifier : unsignedModifier;

    if (
      !Number.isSafeInteger(count) ||
      !Number.isSafeInteger(sides) ||
      !Number.isSafeInteger(modifier) ||
      count < 1 ||
      count > MAX_DICE_PER_ROLL ||
      sides < 2
    ) {
      return null;
    }

    const allDice = Array.from({ length: count }, () => this.rollDie(sides));
    const diceTotal = allDice.reduce((total, roll) => total + roll, 0);

    return this.record({
      label,
      notation: this.formatNotation(count, sides, modifier),
      allDice,
      keptDice: allDice,
      modifier,
      total: diceTotal + modifier,
      mode: 'normal',
    });
  }

  clearHistory(): void {
    this.history.set([]);
  }

  private rollDie(sides: number): number {
    return Math.floor(this.random() * sides) + 1;
  }

  private formatNotation(
    count: number,
    sides: number,
    modifier: number,
  ): string {
    const base = `${count}d${sides}`;
    if (modifier === 0) return base;

    return `${base} ${modifier > 0 ? '+' : '-'} ${Math.abs(modifier)}`;
  }

  private record(
    result: Omit<LocalRollResult, 'id' | 'timestamp'>,
  ): LocalRollResult {
    const recordedResult: LocalRollResult = {
      ...result,
      id: `local-roll-${this.nextId}`,
      timestamp: Date.now(),
    };
    this.nextId += 1;

    this.history.update((history) =>
      [recordedResult, ...history].slice(0, HISTORY_LIMIT),
    );

    return recordedResult;
  }
}
