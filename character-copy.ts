export interface Source {
  readChar(): string;
}

export interface Destination {
  writeChar(c: string): void;
}

export class Copier {
  constructor(private source: Source, private destination: Destination) {}

  copy() {
    this.destination.writeChar(this.source.readChar());
  }
}
