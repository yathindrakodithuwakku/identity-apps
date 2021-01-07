/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { TestableComponentInterface } from "@wso2is/core/models";
import classNames from "classnames";
import React, { FunctionComponent, MouseEvent, ReactElement, ReactNode } from "react";
import { Card, CardProps, Divider, Icon, Label, Popup } from "semantic-ui-react";
import { GenericIcon, GenericIconProps, GenericIconSizes } from "../icon";

/**
 * Proptypes for the template card component.
 */
export interface TemplateCardPropsInterface extends TestableComponentInterface {
    /**
     * Additional classes.
     */
    className?: string;
    /**
     * Template description
     */
    description: string;
    /**
     * Set of tags for the template.
     */
    tags?: TemplateCardTagInterface[] | string[];
    /**
     * Element to render the tag as.
     */
    tagsAs?: "icon" | "label" | "default";
    /**
     * Title for the tags section.
     */
    tagsSectionTitle?: ReactNode;
    /**
     * Disabled mode.
     */
    disabled?: boolean;
    /**
     * Template Name.
     */
    name: string;
    /**
     * Template ID.
     */
    id?: string;
    /**
     * Template image.
     */
    image?: GenericIconProps["icon"];
    /**
     * Size of the image.
     */
    imageSize?: GenericIconSizes;
    /**
     * Icon options.
     */
    imageOptions?: Omit<GenericIconProps, "icon" | "size">;
    /**
     * Template card onclick event.
     * @param {React.MouseEvent<HTMLAnchorElement>} e - Event,
     * @param {CardProps} data - Card data.
     */
    onClick: (e: MouseEvent<HTMLAnchorElement>, data: CardProps) => void;
    /**
     * Selected mode flag.
     */
    selected?: boolean;
    /**
     * Show/Hide tags section.
     */
    showTags?: boolean;
    /**
     * Show/Hide tag icon.
     */
    showTagIcon?: boolean;
    /**
     * Text align direction.
     */
    textAlign?: "center" | "left" | "right";
    /**
     * Inline mode.
     */
    inline?: boolean;
}

/**
 * Template card tag interface.
 */
export interface TemplateCardTagInterface {
    /**
     * Tag name.
     */
    name: string;
    /**
     * Tag display name.
     */
    displayName?: string;
    /**
     * Tag image.
     */
    logo?: any;
}

/**
 * Template card component that can be used to represent application and IDP templates.
 *
 * @param {TemplateCardPropsInterface} props - Props injected to the components.
 *
 * @return {React.ReactElement}
 */
export const TemplateCard: FunctionComponent<TemplateCardPropsInterface> = (
    props: TemplateCardPropsInterface
): ReactElement => {

    const {
        className,
        description,
        disabled,
        name,
        id,
        inline,
        image,
        imageOptions,
        imageSize,
        onClick,
        selected,
        showTags,
        showTagIcon,
        tags,
        tagsAs,
        tagsSectionTitle,
        textAlign,
        [ "data-testid" ]: testId
    } = props;

    const classes = classNames(
        "template-card",
        {
            disabled,
            inline,
            selected,
            [ "with-image" ]: image
        },
        className
    );

    /**
     * Renders the tag based on render type.
     *
     * @param {TemplateCardTagInterface | string} tag - Tag to be rendered.
     * @param {"icon" | "label" | "default"} as - Render type.
     * @param {number} index - Tag index in array.
     * @return {React.ReactElement}
     */
    const renderTag = (tag: TemplateCardTagInterface | string, as: "icon" | "label" | "default",
                       index: number): ReactElement => {

        if (typeof tag === "string") {
            return <span className="tag default" key={ index }>
                { tag }
                { (tags.length === 1 || index === tags.length - 1) ? "" : "," }
            </span>;
        }

        if (as === "icon") {
            return (
                <Popup
                    basic
                    key={ index }
                    trigger={ (
                        <span
                            className="icon-wrapper"
                            data-testid={ `${ testId }-logo-wrapper` }
                        >
                            <GenericIcon
                                icon={ tag.logo }
                                size={ "x22" }
                                spaced="right"
                                fill={ false }
                                data-testid={ `${ testId }-logo` }
                                inline
                                transparent
                            />
                        </span>
                    ) }
                    size="mini"
                    position="top center"
                    content={ tag.displayName }
                    inverted
                />
            );
        }

        if (as === "label") {
            return (
                <Label key={ index } size="mini" data-testid={ `${ testId }-logo-label` }>
                    { tag.displayName }
                </Label>
            );
        }

        return <span className="tag default" key={ index }>
            { tag.displayName }
            { (tags.length === 1 || index === tags.length - 1) ? "" : ", " }
        </span>;
    };

    return (
        <Card
            id={ id }
            className={ classes }
            onClick={ onClick }
            link={ false }
            as="div"
            data-testid={ testId }
        >
            {
                image && (
                    <Card.Content className="card-image-container">
                        <GenericIcon
                            square
                            transparent
                            className="card-image"
                            size={ imageSize }
                            icon={ image }
                            data-testid={ `${ testId }-image` }
                            { ...imageOptions }
                        />
                    </Card.Content>
                )
            }
            <Card.Content className="card-text-container" style={ { textAlign } }>
                <Card.Header data-testid={ `${ testId }-header` }>{ name }</Card.Header>
                <Card.Description data-testid={ `${ testId }-description` }>{ description }</Card.Description>
                {
                    (showTags && tags && tags instanceof Array && tags.length > 0)
                        ? (
                            <div className="tags-container" data-testid={ `${ testId }-tags-container` }>
                                { tagsSectionTitle && (
                                    <div className="title" data-testid={ `${ testId }-tags-title` }>
                                        { tagsSectionTitle }
                                    </div>
                                ) }
                                <div className="tags" data-testid={ `${ testId }-tags` }>
                                    { showTagIcon && <Icon name="tag" className="tag-icon" size="tiny" color="grey" /> }
                                    {
                                        (tags as Array<TemplateCardTagInterface|string>)
                                            .map((tag, index) => renderTag(tag, tagsAs, index))
                                    }
                                </div>
                            </div>
                        )
                        : <Divider hidden/>
                }
            </Card.Content>
        </Card>
    );
};

/**
 * Default props for the template card.
 */
TemplateCard.defaultProps = {
    "data-testid": "template-card",
    imageSize: "tiny",
    inline: true,
    tagsAs: "label",
    textAlign: "center"
};
