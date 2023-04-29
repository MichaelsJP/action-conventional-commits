import isValidCommitMessage from "../isValidCommitMesage";

test.each([
    ["chore(nice-one): doing this right", true],
    ["feat!: change all the things", true],
    ["fix(user)!: a fix with some breaking changes", true],
    ["fix: menu must open on shortcut press", true],
    ["something: should not work", false],
    ["fixes something", false],
    ["🚧 fix: menu must open on shortcut press", true],
    ["fix(menus): menu must open on shortcut press", true],
    ["🚧 fix(menus): menu must open on shortcut press", true],
    ["🚧 fixing something", false],
    ["🚧 something: should not work", false],
    ["chorz: 123", false],
])("Test with custom labels '%s'", (message, expected) => {
    expect(isValidCommitMessage(message)).toBe(expected);
});

test.each([
    ["chore(nice-one): doing this right", ['foo1', 'foo2'], false],
    ["chore(nice-one): doing this right", ['foo1', 'chore', 'foo2'], true],
    ["chore(nice-one): doing this right", undefined, true],
    ["feat!: change all the things", undefined, true],
    ["fix(user)!: a fix with some breaking changes", undefined, true],
    ["fix: menu must open on shortcut press", undefined, true],
    ["something: should not work", undefined, false],
    ["something: should not work", ['something'], true],
    ["something(withsomescope): should not work", ['something'], true],
    ["fixes something", undefined, false],
    ["🚧 fix: menu must open on shortcut press", undefined, true],
    ["fix(menus): menu must open on shortcut press", undefined, true],
    ["🚧 fix(menus): menu must open on shortcut press", undefined, true],
    ["🚧 fixing something", undefined, false],
    ["🚧 something: should not work", undefined, false],
    ["chorz: 123", undefined, false],
])("Test with custom labels '%s'", (message, labels, expected) => {
    expect(isValidCommitMessage(message, labels)).toBe(expected);
});
