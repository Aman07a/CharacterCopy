// Test doubles
//  - fakes
//  - stubs
//  - mocks

import { Copier, Destination, Source } from "./character-copy";

describe("character-copy", () => {
  describe("copy", () => {
    describe("one character with newline", () => {
      test.each([{ char: "a" }, { char: "b" }, { char: "!" }])(
        "char: $char",
        ({ char }) => {
          // Arrange
          const mockReadChar = jest.fn(() => char);
          const source: Source = {
            readChar: mockReadChar,
          };
          const mockWriteChar = jest.fn();
          const destination: Destination = {
            writeChar: mockWriteChar,
          };
          const sut = new Copier(source, destination);
          // Act
          sut.copy();
          // Assert
          expect(mockWriteChar).toHaveBeenCalledTimes(1);
          expect(mockWriteChar).toHaveBeenCalledWith(char);
        }
      );
    });

    describe("multiple characters with newline", () => {
      test.each([{ chars: ["a", "b", "c"] }])("char: $char", ({ chars }) => {
        // Arrange
        const mockReadChar = jest.fn();
        mockReadChar.mockReturnValue("\n");
        mockReadChar.mockReturnValueOnce(chars[0]);
        mockReadChar.mockReturnValueOnce(chars[1]);
        mockReadChar.mockReturnValueOnce(chars[2]);
        const source: Source = {
          readChar: mockReadChar,
        };
        const mockWriteChar = jest.fn();
        const destination: Destination = {
          writeChar: mockWriteChar,
        };
        const sut = new Copier(source, destination);
        // Act
        sut.copy();
        // Assert
        // expect(mockWriteChar).toHaveBeenCalledTimes(3);
        expect(mockWriteChar).toHaveBeenCalledWith(chars[0]);
        expect(mockWriteChar).toHaveBeenCalledWith(chars[1]);
        expect(mockWriteChar).toHaveBeenCalledWith(chars[2]);
      });
    });
  });
});
