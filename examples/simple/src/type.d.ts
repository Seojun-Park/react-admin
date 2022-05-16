import { Record } from 'react-admin';

type BackLinkProps = Array<{
    date?: string;
    url?: string;
    info?: {
        email?: string;
        nationality?: string;
    };
}> &
    Record;

export interface PostRecord extends Record {
    id: number;
    title: string;
    teaser?: string;
    body?: string;
    view?: number;
    average_note?: number;
    commentable?: boolean;
    pictures?: Array<ImageProps>;
    published_at?: Date;
    tags?: Array<number>;
    category?: string;
    subcategory: string;
    backlinks?: Array<BackLinkProps>;
    notifications: Array<number>;
}
