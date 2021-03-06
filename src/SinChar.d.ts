export interface IOptions {
    selector: string;
    hiddenInputId: string;
    fillRecievedValue: boolean;
    filledClass?: string;
    numbersOnly?: boolean;
    autofocus?: boolean;
}
export declare class SinChar {
    private digits;
    private resultingPassInput;
    private filledPass;
    private recievedPass;
    private fillRecieved;
    private filledClass?;
    private numbersOnly?;
    private autofocus?;
    constructor(options: IOptions);
    processCodeInput(cb?: Function): void;
}
