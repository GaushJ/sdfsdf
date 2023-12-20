import React from "react";

interface Props {
    primary: "disabled" | "hover" | "active" | "default";
    className: any;
    text: string;
}

export const Button = ({ primary, className, text = "Create" }: Props): JSX.Element => {
    return (
        <button
            className={`inline-flex flex-col items-center gap-[8px] rounded-[8px] justify-center relative all-[unset] box-border ${
                primary === "default"
                    ? "pr-[var(--default-button-controlheight)] pl-[var(--default-button-controlheight)] py-[16px]"
                    : "pr-[var(--default-button-controlheight)] pl-[var(--default-button-controlheight)] py-[12px]"
            } ${["active", "disabled", "hover"].includes(primary) ? "h-[50px]" : ""} ${
                primary === "default" ? "bg-[#2e2e3a]" : primary === "disabled" ? "bg-[#b7b7ba]" : "bg-[#1e1e26]"
            } ${className}`}
        >
            <div className="inline-flex items-center gap-[4px] flex-[0_0_auto] justify-center relative">
                <div
                    className={`w-fit mt-[-1.00px] tracking-[0] text-[14px] text-white font-medium whitespace-nowrap relative ${
                        primary === "default" ? "leading-[18px]" : "leading-[20px]"
                    }`}
                >
                    {text}
                </div>
            </div>
        </button>
    );
};
