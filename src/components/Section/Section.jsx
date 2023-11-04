import React, { Component } from 'react';
import style from './Section.module.css';

export class Section extends Component {
  render() {
    return (
      <section className={style.section}>
        {this.props.title && <h2>{this.props.title}</h2>}
        {this.props.children}
      </section>
    );
  }
}
