import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
  attr,
} from "@microsoft/fast-element";

// const apiURL = `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${x=>{x.count}}`;

const template = html<ApiTableElement>`
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Post ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        ${repeat(
          (x) => x.data,
          html`
            <tr>
              <td>${(x) => x.userId}</td>
              <td>${(x) => x.id}</td>
              <td>${(x) => x.title}</td>
              <td>${(x) => x.body}</td>
            </tr>
          `
        )}
      </tbody>
    </table>
  </div>
  <div class="btn-container">
    <div>
      <button @click=${(x) => x.handleNext()}>+</button>
      <button @click=${(x) => x.handlePrevious()}>-</button>
    </div>
  </div>
`;

const styles = css`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
  .table-container {
    height: 50vh;
    overflow: scroll;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    align-item: center;
    margin-top: 1rem;
  }
`;

@customElement({ name: "api-table", template, styles })
export class ApiTableElement extends FASTElement {
  @attr() count = 1;
  @attr data = [];
  //   @attr

  get apiURL() {
    return `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${this.count}`;
  }

  async fetchData() {
    const response = await fetch(this.apiURL);
    const data = await response.json();
    this.data = data;
    console.log("fetch");
    console.log(this.data);
    this.render();
  }

  async connectedCallback() {
    // console.log(this.apiUrl);
    super.connectedCallback();
    await this.fetchData();
    console.log("connected");
    console.log(this.data);
    this.render();
  }

  async render() {
    console.log("render");
    console.log(this.data);
    return template;
  }
  handleNext() {
    this.count++;
    console.log(this.apiURL);
    this.fetchData();
  }
  handlePrevious() {
    this.count--;
    this.fetchData();
  }
}
