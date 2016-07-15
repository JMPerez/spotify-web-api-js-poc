import Request from './request/Request';
import RequestBuilder from './request/RequestBuilder';
import NodeRequest from './request/NodeRequest';

Request.setRequestImplementation(NodeRequest);

export { Request, RequestBuilder };
