import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { grey } from "@material-ui/core/colors";
import axios from "axios";

import { NavLink as RouterNavLink, withRouter } from "react-router-dom";

import CustomScrollbar from "react-scrollbars-custom";

import { MainContext } from "../App.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Box,
  Grid,
  Chip,
  Collapse,
  Link as MuiLink,
  ListItem,
  ListItemText,
  Drawer as MuiDrawer,
  List as MuiList,
  Typography
} from "@material-ui/core";

import routes from "../routes/index";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const SimpleLink = styled(MuiLink)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(CustomScrollbar)`
  background-color: ${props => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${props => props.theme.sidebar.background};
  margin-top: -18px;
`;

const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props =>
    !props.searchcolor && props.currenttheme === 1
      ? "#333"
      : props.theme.sidebar.header.color};
  background-color: ${props =>
    props.searchcolor && props.currenttheme === 1
      ? props.searchcolor
      : props.searchcolor
        ? props.theme.sidebar.background
        : props.theme.sidebar.header.background};
  padding-left: ${props => props.theme.spacing(3)}px;
  font-size: 13pt;
  height: 56px;

  ${props => props.theme.breakpoints.up("sm")} {
    height: 64px;
    font-size: 14pt;
  }
`;

const BrandIcon = styled(Icon)`
  font-size: 39pt;
  overflow: visible;
  text-align: "center";
  margin-top: -12px;
  margin-left: 8px;
  filter: drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.1));
`;

const Category = styled(ListItem)`
  padding-top: ${props => props.theme.spacing(2.4)}px;
  padding-bottom: ${props => props.theme.spacing(2.4)}px;
  padding-left: ${props => props.theme.spacing(4)}px;
  padding-right: ${props => props.theme.spacing(1)}px;
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  border-left: ${props => (props.activecategory === "true" ? "3px" : "0px")}
    solid ${props => props.currentcolor};

  svg {
    font-size: 20px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  &.${props => props.activeClassName} {
    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props => props.theme.sidebar.color};
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    font-weight: ${props => props.theme.typography.fontWeightRegular};
    padding: 0 ${props => props.theme.spacing(4)}px;
  }
`;

const CategoryIcon = styled(FontAwesomeIcon)`
  color: ${props => props.currentcolor};
  width: 25px !important;
`;

const CountBadge = styled(Chip)`
  font-size: 11px;
  height: 20px;
  float: right;
  color: ${props => props.theme.sidebar.color};
  background-color: unset;
  border: none;
  margin-right: 10px;
`;

const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(0)}px
    ${props => props.theme.spacing(4)}px ${props => props.theme.spacing(0)}px;
  opacity: 0.9;
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  margin-top: 19px;
`;

const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing(4)}px
    ${props => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  color: ${props => props.theme.sidebar.color};
  background-color: ${props => props.theme.sidebar.background};
  width: 260px;
  overflow: hidden;
`;

const LightIcon = styled(FontAwesomeIcon)({
  cursor: "pointer",
  color: grey[200],
  marginLeft: 10
});
const DarkIcon = styled(FontAwesomeIcon)({
  cursor: "pointer",
  color: grey[800],
  marginLeft: 10
});
const SpacedIcon = styled(FontAwesomeIcon)({
  cursor: "pointer",
  marginLeft: 10
});

function SidebarCategory({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  activecategory,
  searchExpand,
  currentcolor,
  showTooltip,
  ...rest
}) {
  return (
    <Category
      activecategory={activecategory}
      currentcolor={currentcolor}
      {...rest}
    >
      <Tooltip title={showTooltip ? name : ""} placement="right">
        <div>{icon}</div>
      </Tooltip>
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? (
        isOpen ? (
          <CategoryIcon icon="chevron-up" />
        ) : (
          <CategoryIcon icon="chevron-down" />
        )
      ) : null}
      {badge ? <CountBadge label={badge} /> : ""}
    </Category>
  );
}

function SidebarLink({ name, to, badge, icon, showTooltip }) {
  return (
    <SimpleLink href={to} target="_blank" rel="noreferrer">
      <Category>
        <Tooltip title={showTooltip ? name : ""} placement="right">
          <div>{icon}</div>
        </Tooltip>
        <CategoryText>
          {name}
          {(name === "Documentation" || name === "Blog") && (
            <FontAwesomeIcon
              icon="external-link-alt"
              style={{ paddingLeft: 6, paddingRight: 6 }}
            />
          )}
        </CategoryText>
      </Category>
    </SimpleLink>
  );
}

class Sidebar extends React.Component {
  intervalID = 0;

  state = {
    counts: {}
  };

  toggle = index => {
    // Collapse all elements
    Object.keys(this.state).forEach(
      item =>
        this.state[index] ||
        this.setState(() => ({
          [item]: false
        }))
    );

    // Toggle selected element
    this.setState(state => ({
      [index]: !state[index]
    }));
  };

  componentDidMount() {
    /* Open collapse element that matches current url */
    const pathName = this.props.location.pathname;

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === "/" ? true : false;

      this.setState(() => ({
        [index]: isActive || isOpen || isHome
      }));
    });

    this.countUpdate();
    //this.intervalID = setInterval(() => {
    //  this.countUpdate();
    //}, 20000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  // Abbreviate counts
  abbreviateNumber = value => {
    let newValue = value;
    if (value > 1000) {
      const suffixes = ["", "k", "M", "B", "T"];
      let suffixNum = 0;
      while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
      }
      newValue = newValue.toFixed(1); // .toPrecision(3);
      newValue += suffixes[suffixNum];
    }
    return newValue;
  };

  // Fetch the document counts for all OpenML entity types
  countUpdate = async () => {
    const ELASTICSEARCH_SERVER = process.env.REACT_APP_ES_URL || "http://localhost:9200/";

    const data = {
      size: 0,
      query: {
        bool: {
          should: [{ term: { status: "active" } },
          { bool: { must_not: { exists: { field: "status" } } } }]
        }
      },
      aggs: { count_by_type: { terms: { field: "_type", size: 100 } } }
    };

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    axios
      .post(ELASTICSEARCH_SERVER + "_all/_search", data, headers)
      .then(response => {
        let res = response.data.aggregations.count_by_type.buckets;
        let counts = {};
        res.forEach(r => {
          counts[r.key] = this.abbreviateNumber(r.doc_count);
        });
        this.setState({ counts: counts });
      })
      .catch(error => {
        console.log(error);
      });

    // second query for benchmark counts
    const bench_data = {
      size: 0,
      query: { bool: { filter: { bool: { should: [{ "wildcard": { "name": "*benchmark*" } }, { "wildcard": { "name": "*suite*" } }] } } } }
    };
    axios
      .post(ELASTICSEARCH_SERVER + "study/study/_search", bench_data, headers)
      .then(response => {
        let counts = this.state.counts;
        counts["benchmark"] = response.data.hits.total;
        this.setState({ counts: counts });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { classes, staticContext, location, ...other } = this.props;
    return (
      <MainContext.Consumer>
        {context => (
          <Drawer variant="permanent" open={false} {...other}>
            {/* The OpenML logo in svg format */}
            <SimpleLink href="/">
              <Brand
                searchcolor={context.getColor()}
                currenttheme={context.currentTheme}
              >
                <BrandIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                    <g id="Group_717" data-name="Group 717" transform="translate(-1277.246 -972.152)">
                      <g id="Group_524" data-name="Group 524" transform="translate(-352.672 637.582)">
                        {/* <g id="Group_522" data-name="Group 522">
                          <path id="Path_291" data-name="Path 291" d="M1681.944,345.585h8.12c5.629,0,8.67,3.074,8.67,7.053,0,4.011-3.041,7.052-8.67,7.052h-4.5v8.541h-3.623Zm3.623,3.041v8.023h4.5c3.429,0,5.047-1.682,5.047-4.011,0-2.265-1.618-4.012-5.047-4.012Z" fill="#fff"></path>
                          <path id="Path_292" data-name="Path 292" d="M1707.4,351.732a8.415,8.415,0,1,1-8.67,8.411A8.442,8.442,0,0,1,1707.4,351.732Zm0,13.781a5.38,5.38,0,1,0-5.047-5.37A5.138,5.138,0,0,0,1707.4,365.513Z" fill="#fff"></path>
                          <path id="Path_293" data-name="Path 293" d="M1733.7,365.343a.84.84,0,0,1-.84-.839v-1.9a.642.642,0,0,0,.006-.107v-7.533h4.4v-2.914h-4.4v-5.176h-3.628v5.176h-2.488v0h-.453a5.825,5.825,0,0,0-4.691,1.9l-.194-.064v-1.844h-3.623v16.207h3.623V356.929a6.223,6.223,0,0,1,4.512-1.97l.826,0v0h2.488v7.665c0,.094,0,.188.006.275v2.357a3,3,0,0,0,3,2.995h6.3v-2.908Z" fill="#fff"></path>
                          <path id="Path_294" data-name="Path 294" d="M1770.577,363.836v-16.6h-3.518v17.727a3.292,3.292,0,0,0,3.293,3.292h9.508v-3.3h-8.166A1.117,1.117,0,0,1,1770.577,363.836Z" fill="#fff"></path>
                          <path id="Path_295" data-name="Path 295" d="M1761.254,347.232l-7.207,14.76h-.125l-7.206-14.76h-3.168v21.019h3.3v-13.23l.1-.034,6.337,13.264h1.4l6.351-13.263.1.034v13.229h3.284V347.232Z" fill="#fff"></path>
                        </g> */}
                        <g id="Group_523" data-name="Group 523">
                          <path id="Path_296" data-name="Path 296" d="M1669.747,362.38a7.512,7.512,0,0,1-5.31,2.19,7.494,7.494,0,0,0-7.49,7.5,7.5,7.5,0,1,1-7.51-7.5,7.5,7.5,0,1,0,0-15,7.5,7.5,0,1,1,7.51-7.5,7.494,7.494,0,0,0,7.49,7.5,7.5,7.5,0,0,1,5.31,12.81Z" fill="#fff"></path>
                          <path id="Path_297" data-name="Path 297" d="M1638.451,360.61a5,5,0,1,1,0-7.081A5.007,5.007,0,0,1,1638.451,360.61Z" fill="#fff"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </BrandIcon>
                <Box>PortML</Box>
              </Brand>
            </SimpleLink>
            <Scrollbar style={{ width: "260px", height: "100%" }}>
              {/* Loop over all categories */}
              <List disablePadding>
                <Items>
                  {routes.map((category, index) => (
                    <React.Fragment key={index}>
                      {category.header && !context.miniDrawer ? (
                        <SidebarSection variant="caption">
                          {category.header}
                        </SidebarSection>
                      ) : null}
                      {category.header && context.miniDrawer ? <hr /> : null}
                      {category.component ? (
                        category.children ? (
                          <React.Fragment key={index}>
                            {/* Main sidebar menu items with children */}
                            <SidebarCategory
                              isCollapsable={false}
                              name={category.id}
                              component={NavLink}
                              to={
                                category.path +
                                (category.entity_type === undefined
                                  ? ""
                                  : "?type=" + category.entity_type)
                              }
                              exact
                              activeClassName="active"
                              icon={category.icon}
                              activecategory={
                                category.entity_type === context.type
                                  ? "true"
                                  : "false"
                              }
                              currentcolor={context.getColor()}
                              badge={
                                context.type === undefined &&
                                  this.state.counts[category.entity_type]
                                  ? this.state.counts[category.entity_type]
                                  : 0
                              }
                              showTooltip={context.miniDrawer}
                            />
                            {/* Collapsable submenu for children */}
                            <Collapse
                              in={
                                context.type === category.entity_type &&
                                !context.miniDrawer
                              }
                              timeout="auto"
                              unmountOnExit
                            >
                              {category.children.map((route, index) => (
                                <SidebarCategory
                                  key={index}
                                  name={route.name}
                                  activeClassName="active"
                                  to={
                                    category.path +
                                    "?type=" +
                                    category.entity_type +
                                    "&" +
                                    category.subtype_filter +
                                    "=" +
                                    route.subtype
                                  }
                                  exact
                                  icon={route.icon}
                                  activecategory={
                                    category.entity_type === context.type
                                      ? "true"
                                      : "false"
                                  }
                                  currentcolor={context.getColor()}
                                  component={NavLink}
                                  searchExpand={
                                    category.entity_type === context.type &&
                                      context.searchCollapsed
                                      ? () => context.collapseSearch(false)
                                      : undefined
                                  }
                                  badge={
                                    category.entity_type === context.type
                                      ? (context.filters.measure_type &&
                                        route.subtype.split("_")[1] ===
                                        context.filters.measure_type
                                          .value) ||
                                        (context.filters.study_type &&
                                          route.subtype ===
                                          context.filters.study_type.value) // Only show subtype counts if a subtype is selected
                                        ? context.counts
                                        : 0
                                      : this.state.counts[category.entity_type]
                                        ? this.state.counts[category.entity_type]
                                        : 0
                                  }
                                />
                              ))}
                            </Collapse>
                          </React.Fragment>
                        ) : (
                          <React.Fragment key={index}>
                            {/* Main sidebar menu items without children */}
                            <SidebarCategory
                              isCollapsable={false}
                              name={category.id}
                              to={
                                category.path +
                                (category.entity_type === undefined
                                  ? ""
                                  : "?type=" + category.entity_type)
                              }
                              activeClassName="active"
                              component={NavLink}
                              icon={category.icon}
                              exact
                              badge={
                                category.entity_type === context.type
                                  ? context.counts
                                    ? this.abbreviateNumber(context.counts)
                                    : this.state.counts[category.entity_type]
                                  : context.type === undefined &&
                                    this.state.counts[category.entity_type]
                                    ? this.state.counts[category.entity_type]
                                    : 0
                              }
                              activecategory={
                                (location.pathname !== "/search" &&
                                  location.pathname === category.path) ||
                                  (category.entity_type === context.type &&
                                    context.type !== undefined)
                                  ? "true"
                                  : "false"
                              }
                              searchExpand={
                                category.entity_type === context.type &&
                                  context.searchCollapsed
                                  ? () => context.collapseSearch(false)
                                  : undefined
                              }
                              currentcolor={
                                location.pathname === "/search"
                                  ? context.getColor()
                                  : category.color
                              }
                              showTooltip={context.miniDrawer}
                            />
                          </React.Fragment>
                        )
                      ) : (
                        <SidebarLink // All the other menu items: links to documentation
                          isCollapsable={false}
                          name={category.id}
                          to={category.path}
                          activeClassName="active"
                          component={SimpleLink}
                          icon={category.icon}
                          badge={
                            category.entity_type === context.type
                              ? context.counts
                              : 0
                          }
                          activecategory={
                            category.entity_type === context.type ? true : false
                          }
                          searchExpand={
                            category.entity_type === context.type &&
                              context.searchCollapsed
                              ? context.collapseSearch
                              : undefined
                          }
                          currentcolor={context.getColor()}
                          showTooltip={context.miniDrawer}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </Items>
              </List>
            </Scrollbar>
            <SidebarFooter>
              <MainContext.Consumer>
                {context => (
                  <Grid container spacing={6}>
                    <Grid item>
                      {context.miniDrawer ? (
                        <Tooltip title="Expand" placement="top-start">
                          <div style={{ display: "inline-block" }}>
                            <SpacedIcon
                              icon="chevron-right"
                              size="lg"
                              onClick={() => context.miniDrawerToggle()}
                            />
                          </div>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Minify" placement="top-start">
                          <div style={{ display: "inline-block" }}>
                            <SpacedIcon
                              icon="chevron-left"
                              size="lg"
                              onClick={() => context.miniDrawerToggle()}
                            />
                            <Typography
                              display="inline"
                              style={{ paddingLeft: 10 }}
                            >
                              Minify
                            </Typography>
                          </div>
                        </Tooltip>
                      )}
                    </Grid>
                  </Grid>
                )}
              </MainContext.Consumer>
            </SidebarFooter>
          </Drawer>
        )}
      </MainContext.Consumer>
    );
  }
}

export default withRouter(Sidebar);
