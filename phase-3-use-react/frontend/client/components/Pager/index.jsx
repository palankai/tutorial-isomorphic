import React from 'react';

const Pager = () => (
  <nav aria-label="Page navigation">
    <ul className="pagination pagination-lg">
      <li className="disabled"><span aria-hidden="true">&laquo;</span></li>
      <li className="active"><span>1</span></li>
      <li><a href="/?page=2">2</a></li>
      <li><a href="/?page=3">3</a></li>
      <li><a href="/?page=4">4</a></li>
      <li><a href="/?page=5">5</a></li>
      <li><a href="/?page=2" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
    </ul>
  </nav>
);

export default Pager;
