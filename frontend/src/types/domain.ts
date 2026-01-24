

export interface Cardprops{
    domain: string;
    isselected: boolean;
    onClick: ()=>void;
    icon?: React.ComponentType<{color?:string}>;
}

