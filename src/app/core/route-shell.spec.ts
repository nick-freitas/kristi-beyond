import { isStandaloneSheetRoute } from './route-shell';

describe('isStandaloneSheetRoute', () => {
  it('matches the standalone sheet route', () => {
    expect(isStandaloneSheetRoute('/new-view')).toBeTrue();
    expect(isStandaloneSheetRoute('/modify-character')).toBeTrue();
  });

  it('ignores a trailing slash, query, and fragment', () => {
    expect(isStandaloneSheetRoute('/new-view/')).toBeTrue();
    expect(isStandaloneSheetRoute('/new-view?tab=cards')).toBeTrue();
    expect(isStandaloneSheetRoute('/new-view#actions')).toBeTrue();
    expect(isStandaloneSheetRoute('/new-view/?tab=cards#draw')).toBeTrue();
    expect(isStandaloneSheetRoute('/modify-character/')).toBeTrue();
    expect(
      isStandaloneSheetRoute('/modify-character?step=equipment'),
    ).toBeTrue();
    expect(isStandaloneSheetRoute('/modify-character#abilities')).toBeTrue();
    expect(
      isStandaloneSheetRoute('/modify-character/?step=equipment#inventory'),
    ).toBeTrue();
  });

  it('uses the destination after a redirect', () => {
    expect(isStandaloneSheetRoute('/sheet', '/new-view?from=sheet')).toBeTrue();
    expect(
      isStandaloneSheetRoute('/sheet', '/modify-character?from=sheet'),
    ).toBeTrue();
    expect(isStandaloneSheetRoute('/new-view', '/stats')).toBeFalse();
  });

  it('does not match child paths or similarly named classic routes', () => {
    expect(isStandaloneSheetRoute('/new-view/child')).toBeFalse();
    expect(isStandaloneSheetRoute('/new-viewer')).toBeFalse();
    expect(isStandaloneSheetRoute('/classic/new-view')).toBeFalse();
    expect(isStandaloneSheetRoute('/modify-character/child')).toBeFalse();
    expect(isStandaloneSheetRoute('/modify-characters')).toBeFalse();
    expect(isStandaloneSheetRoute('/classic/modify-character')).toBeFalse();
  });
});
