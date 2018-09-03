// TODO refactor for a generic filter object 
/**
 * Abstract interface for search filter.
 * Set E to typeof enumObj.
 *
 * Following members can be added:
 *
 *  string | number | boolean
 *
 *  Array<string | number | boolean>
 *
 *  Date
 */
export interface ResultFilter<E> {
  assignee?: string;
  approvalPerson?: string;
  // invoiceStatus: (InvoiceStatusType[keyof InvoiceStatusType])[];
  reference?: {
    name: keyof E;
    value: string | number;
  };
  // has to be skipped for variable criteria
  // processDefinition: ProcessDefinitionKeys;
}
