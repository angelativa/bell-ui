import { CustomEventInterface } from 'yox';
declare const _default: import("yox").ComponentOptions<unknown, {
    value: unknown;
}, {
    'add.selectOption': unknown;
    'remove.selectOption': unknown;
    'update.selectOption': unknown;
}, {
    handleClearClick(event: CustomEventInterface): void;
    handleRemoveOption(event: CustomEventInterface, index: number): void;
    selectOption(value: any): void;
    deselectOption(value: any): void;
    updateSelectedOptions(value: any): void;
}> & ThisType<{
    handleClearClick(event: CustomEventInterface): void;
    handleRemoveOption(event: CustomEventInterface, index: number): void;
    selectOption(value: any): void;
    deselectOption(value: any): void;
    updateSelectedOptions(value: any): void;
} & import("yox").YoxInterface>;
export default _default;