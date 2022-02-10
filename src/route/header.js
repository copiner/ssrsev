import React from 'react';
import router from './route.config';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      {
        router.map(v =>
          <Link key={v.path} to={v.path}>
            {v.name}
          </Link>
        )
      }
    </div>
  )
};

export default Header;

// {
//    routesList.map((item, i) => {
//        return item.routes.length > 0 ? (
//            <Menu.SubMenu key={i} icon={item.icon} title={<span>{item.title}</span>}>
//              {
//                item.routes.map((link,idx)=>{
//                  return link.status?(
//                    <Menu.Item key={ link.id } url={link.path} title={link.title}><Link to={link.path}>{link.title}</Link></Menu.Item>
//                  ):""
//                })
//              }
//            </Menu.SubMenu>
//          ) : ""
//      })
//  }
