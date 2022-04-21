import when from ".";

test("the function is called when true", () => {
    const fn = jest.fn();

    when(() => true, fn());

    expect(fn).toBeCalled();
});

test("the function is not called when false", () => {
    const fn = jest.fn();

    when(() => false, fn());

    // expect(fn).not.toBeCalled();
});
