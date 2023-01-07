
import blocksRoutes from 'blocks/routes';
import demosRoutes from 'demos/routes';
import docsRoutes from 'docs/routes';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import viewsRoutes from 'views/routes';

const Routes = (): JSX.Element => {
  return (
    <ReactRoutes>
      {viewsRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      {docsRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      {blocksRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      {demosRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      <Route path="*" element={<Navigate replace to="/not-found-cover" />} />
    </ReactRoutes>
  );
};

export default Routes;
