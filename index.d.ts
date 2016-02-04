// Type definitions for Pouch
// Project: http://pouchdb.com
// Definitions started by: Bill Sears <https://github.com/MrBigDog2U/>
// Definition updates by: Max Battcher <https://github.com/WorldMaker/>

export interface PouchError {
    status: number;
    error: string;
    reason: string;
}

export interface PouchInfoResponse {
    db_name: string;
    doc_count: number;
    update_seq: string;
}

export interface PouchGetOptions {
    rev?: string;
    revs?: boolean;
    revs_info?: boolean;
    conflicts?: boolean;
    attachments?: boolean;
}

export interface PouchGetResponse {
    _id: string;
    _rev: string;
    _attachments: any;
}

export interface PouchAllDocsOptions {
    startkey?: string;
    endKey?: string;
    descending?: boolean;
    include_docs?: boolean;
    conflicts?: boolean;
}

export interface PouchAllDocsItem {
    id: string;
    key: string;
    value: any;
    doc: any;
}

export interface PouchAllDocsResponse {
    total_rows: number;
    rows: PouchAllDocsItem[];
}

export interface PouchUpdateOptions {
    new_edits?: boolean;
}

export interface PouchUpdateResponse {
    ok: boolean;
    id: string;
    rev: string;
}

export interface PouchQueryOptions {
    complete?: any;
    include_docs?: boolean;
    error?: (err: PouchError) => void;
    descending?: boolean;
    reduce?: boolean;
}

export interface PouchQueryResponse {
    rows: any[];
}

export interface PouchFilter {
    map: (doc: any) => void;
    reduce?: (key: string, value: any) => any;
}

export interface PouchAttachmentOptions {
    decode?: boolean;
}

export interface PouchCancellable {
    cancel: () => void;
}

export interface PouchChangesOptions {
    onChange?: (change: PouchChange) => void;
    complete?: (err: PouchError, res: PouchChanges) => void;
    seq?: number;
    since?: number | string;
    descending?: boolean;
    filter?: PouchFilter;
    continuous?: boolean;
    include_docs?: boolean;
    conflicts?: boolean;
    live?: boolean;
}

export interface PouchChangesEmitter extends PouchCancellable {
    on(event: string, handler: Function): PouchChangesEmitter;
    on(event: 'change', handler: (change: PouchChange) => void): PouchChangesEmitter;
    on(event: 'complete', handler: (info: PouchChanges) => void): PouchChangesEmitter;
    on(event: 'error', handler: (error: PouchError) => void): PouchChangesEmitter;
}

export interface PouchChange {
    changes: any;
    doc: PouchGetResponse;
    id: string;
    seq: number;
}

export interface PouchChanges {
    results: PouchChange[];
}

export interface PouchRevsDiffOptions {
}

export interface PouchReplicateOptions {
    continuous?: boolean;
    onChange?: (change: any) => void;
    filter?: any;			// Can be either string or PouchFilter
    complete?: (err: PouchError, res: PouchChanges) => void;
}

export interface PouchReplicateResponse {
    ok: boolean;
    start_time: Date;
    end_time: Date;
    docs_read: number;
    docs_written: number;
}

export interface PouchReplicate {
    from(url: string, opts: PouchReplicateOptions, callback: (err: PouchError, res: PouchReplicateResponse) => void): PouchCancellable;
    from(url: string, callback: (err: PouchError, res: PouchReplicateResponse) => void): PouchCancellable;
    to(dbName: string, opts: PouchReplicateOptions, callback: (err: PouchError, res: PouchReplicateResponse) => void): PouchCancellable;
    to(dbName: string, callback: (err: PouchError, res: PouchReplicateResponse) => void): PouchCancellable;
}

export interface PouchOptions {
    name?: string;
    adapter?: string;
}

declare export default class PouchDB {
    constructor(name: string, opts?: PouchOptions);
    destroy(name: string, callback: (err: PouchError) => void): void;
    destroy(name: string): Promise<void>;

    type(): string;
    id(): string;
    close(callback: () => void): void;
    close(): Promise<void>;

    info(callback: (err: PouchError, res: PouchInfoResponse) => void): void;
    info(): Promise<PouchInfoResponse>;

    //
    // get == select by id
    //
    get(id: string, opts: PouchGetOptions, callback: (err: PouchError, res: PouchGetResponse) => void): void;
    get(id: string, callback: (err: PouchError, res: PouchGetResponse) => void): void;
    get(id: string, opts?: PouchGetOptions): Promise<PouchGetResponse>;
    allDocs(opts: PouchAllDocsOptions, callback: (err: PouchError, res: PouchAllDocsResponse) => void): void;
    allDocs(callback: (err: PouchError, res: PouchAllDocsResponse) => void): void;
    allDocs(opts?: PouchAllDocsOptions): Promise<PouchAllDocsResponse>;

    bulkDocs(req: any[], opts: PouchUpdateOptions, callback: (err: PouchError, res: PouchUpdateResponse[]) => void): void;
    bulkDocs(req: any[], callback: (err: PouchError, res: PouchUpdateResponse[]) => void): void;
    bulkDocs(req: any[], opts?: PouchUpdateOptions): Promise<PouchUpdateResponse[]>;
    //
    // post == insert (doc does not contain an _id)
    //
    post(doc: any, opts: PouchUpdateOptions, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
    post(doc: any, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
    post(doc: any, opts?: PouchUpdateOptions): Promise<PouchUpdateResponse>;
    //
    // put == update (doc DOES contain an _id)
    //
    put(doc: any, opts: PouchUpdateOptions, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
    put(doc: any, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
    put(doc: any, opts?: PouchUpdateOptions): Promise<PouchUpdateResponse>;
    //
    // remove == delete
    //
    remove(doc: any, opts: PouchUpdateOptions, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
    remove(doc: any, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
    remove(doc: any, opts?: PouchUpdateOptions): Promise<PouchUpdateResponse>;

    //
    // query == select by other criteria
    //
    query(fun: string, opts: PouchQueryOptions, callback: (err: PouchError, res: PouchQueryResponse) => void): void;
    query(fun: string, callback: (err: PouchError, res: PouchQueryResponse) => void): void;
    query(fun: PouchFilter, opts: PouchQueryOptions, callback: (err: PouchError, res: PouchQueryResponse) => void): void;
    query(fun: PouchFilter, callback: (err: PouchError, res: PouchQueryResponse) => void): void;
    query(fun: string | PouchFilter, opts?: PouchQueryOptions): Promise<PouchQueryResponse>;

    getAttachment(id: string, attachmentId: string, opts?: PouchAttachmentOptions): Promise<any>;
    putAttachment(id: string, rev: string, attachmentId: string, doc: any, type: string): Promise<PouchUpdateResponse>;
    removeAttachment(id: string, rev: string, attachmentId: string): Promise<PouchUpdateResponse>;

    changes(opts?: PouchChangesOptions): PouchChangesEmitter;

    revsDiff(req: any, opts: PouchRevsDiffOptions, callback: (missing: any) => void): void;
    revsDiff(req: any, callback: (missing: any) => void): void;
    replicate: PouchReplicate;
}
