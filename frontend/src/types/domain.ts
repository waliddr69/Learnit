import { Paintbrush } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { Brain } from 'lucide-react';
import { Languages } from 'lucide-react';
import { Cpu } from 'lucide-react';

export interface Cardprops{
    domain: string;
    isselected: boolean;
    onClick: ()=>void;
    icon?: React.ComponentType<{color?:string}>;
}

