import { NavLink } from "react-router-dom";
import React, { ReactNode } from 'react';

import { Checkbox } from "../../styles/inputs";

import {
  ListContainer,
  ListBox,
  List,
  PanelHolder,
  Item,
  CheckboxHolder,
  Title,
  Description,
} from "./ListWithForm.styles";

export const ListWithForm = ({
  items,
  panel,
  title,
  description,
  onClick,
  href,
  hrefLink,
}: {
  items: {
    selected: boolean;
    onClick?: ((e: React.MouseEvent) => void) | (() => void);
    disabled: boolean;
    text: string;
    href: string | null;
    checkboxValue: boolean;
    onCheckboxClick: () => void;
  }[];
  panel: React.ReactNode;
  href: string;
  hrefLink?: string;
  title: string;
  description?: string | ReactNode;
  onClick?: ((e: React.MouseEvent) => void) | (() => void);
}) => {
  return (
    <ListContainer>
      <ListBox>
        <List>
          <NavLink onClick={onClick} to={href}>
            <br />
            <Title $noMargin>{title}</Title>
            <Description>
              {description}&nbsp;
              {hrefLink && window.location.pathname !== href && (
                <NavLink style={{ color: "var(--rp-blue)" }} to={href}>
                  {hrefLink}
                </NavLink>
              )}
            </Description>
          </NavLink>
          {items.map((i) => {
            return (
              <Item
                key={JSON.stringify(i)}
                $selected={i.selected}
                $deactivated={
                  typeof i.checkboxValue === "undefined"
                    ? false
                    : !i.checkboxValue
                }
                as={i.href ? NavLink : null}
                to={i.href ? i.href + location.search : null}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  i.onClick && i.onClick(e);
                }}
              >
                {i.text}
                {typeof i.checkboxValue !== "undefined" && (
                  <CheckboxHolder>
                    <Checkbox
                      disabled={i.disabled}
                      checked={i.checkboxValue}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        e.stopPropagation();
                        i.onCheckboxClick();
                      }}
                    />
                  </CheckboxHolder>
                )}
              </Item>
            );
          })}
        </List>
        <PanelHolder>{panel}</PanelHolder>
      </ListBox>
    </ListContainer>
  );
};
