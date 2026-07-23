/**
 * MDX component kit. Passed to <Content components={mdxComponents} /> so
 * authors can use <Callout>, <Figure>, etc. in .mdx WITHOUT importing them.
 */
import Callout from './Callout.astro';
import Figure from './Figure.astro';
import Gallery from './Gallery.astro';
import Quote from './Quote.astro';
import Columns from './Columns.astro';
import Col from './Col.astro';
import Steps from './Steps.astro';
import Step from './Step.astro';
import Matrix from './Matrix.astro';
import Scale from './Scale.astro';
import Term from './Term.astro';

export const mdxComponents = {
  // decorative
  Callout, Figure, Gallery, Quote, Columns, Col,
  // structural (for methodology / argument writing)
  Steps, Step, Matrix, Scale,
  // inline
  Term,
};
