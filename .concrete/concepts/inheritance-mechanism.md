# Inheritance Mechanism

**Last Updated**: March 8, 2024  
**Related Guides**: [Template Format](./template-format.md), [Customization Points](./customization-points.md)  
**Prerequisite Knowledge**: YAML, Markdown, Object-Oriented Programming Concepts

## Overview

This guide explains the inheritance mechanism used in the Concrete templating system. It covers how templates can inherit from other templates, how changes propagate through the hierarchy, and best practices for creating and maintaining template hierarchies.

## Inheritance Concept

In Concrete, templates can inherit from other templates, creating a hierarchy that allows for specialization while maintaining consistency. This is similar to class inheritance in object-oriented programming, where a child class inherits properties and methods from a parent class.

The inheritance hierarchy in Concrete has three main levels:

1. **Base Templates**: Foundational templates that provide the most generic structure and guidance
2. **Specialized Templates**: Templates that inherit from base templates but are specialized for specific tech stacks
3. **App Implementations**: Concrete implementations of applications built using the templates

## How Inheritance Works

### Declaration

Inheritance is declared in the `concrete.yaml` file using the `inherits` property:

```yaml
name: "react-supabase"
version: "1.0.0"
inherits: "full-stack"
description: "Template for React applications with Supabase backend"
```

In this example, the `react-supabase` template inherits from the `full-stack` template.

### Resolution

When a template is used, the system resolves the inheritance chain:

1. Start with the most specialized template
2. For each file or customization point, check if it exists in the current template
3. If not, look for it in the parent template
4. Continue up the chain until the file or customization point is found or the chain is exhausted

This allows specialized templates to override specific aspects of their parent templates while inheriting the rest.

### Merging

When templates are merged, the following rules apply:

1. **Files**: Files in the child template override files with the same path in the parent template
2. **Customization Points**: Child templates can add new customization points or override the properties of existing ones
3. **Dependencies**: Dependencies are merged, with child dependencies taking precedence in case of conflicts
4. **Documentation**: Documentation is typically not merged automatically but linked through references

## Propagation of Changes

One of the key features of the Concrete inheritance mechanism is the ability to propagate changes through the hierarchy. This happens in two directions:

### Downward Propagation

When a parent template is updated, changes can propagate down to child templates:

1. **Automatic Propagation**: Changes to files that are not overridden in child templates automatically propagate
2. **Conflict Resolution**: Changes to files that are overridden in child templates require manual resolution
3. **Notification**: Child templates are notified of changes in parent templates

### Upward Propagation

When a child template or app implementation introduces improvements, they can be propagated up to parent templates:

1. **Suggestion Mechanism**: Child templates can suggest changes to parent templates
2. **Review Process**: Suggested changes are reviewed before being applied to parent templates
3. **Generalization**: Specific implementations may need to be generalized before being applied to parent templates

## Linking Mechanism

To facilitate the propagation of changes, Concrete uses a lightweight linking mechanism:

1. **Template Registry**: A central registry of templates and their relationships
2. **Change Tracking**: Tracking of changes to templates over time
3. **Diff Generation**: Generation of diffs between template versions
4. **Propagation Rules**: Rules for when and how to propagate changes

This linking is implemented through metadata rather than hard dependencies, allowing templates to evolve independently while still benefiting from improvements in related templates.

## Example Inheritance Chain

```
Base Template
    ↑
Full Stack Template
    ↑
React/Supabase Template
    ↑
Bump App Implementation
```

In this example:

1. The **Base Template** provides fundamental project structure and documentation patterns
2. The **Full Stack Template** adds frontend/backend separation and API patterns
3. The **React/Supabase Template** adds React and Supabase specific components and patterns
4. The **Bump App Implementation** is a concrete application built using the React/Supabase template

## Best Practices

### Creating Template Hierarchies

1. **Start General**: Begin with the most general template and specialize as needed
2. **Clear Boundaries**: Define clear boundaries between template levels
3. **Minimize Override Depth**: Avoid deep chains of overrides that make changes hard to track
4. **Document Relationships**: Clearly document the inheritance relationships

### Maintaining Template Hierarchies

1. **Version Compatibility**: Ensure child templates are compatible with parent template versions
2. **Change Communication**: Communicate changes that affect the hierarchy
3. **Regular Synchronization**: Regularly synchronize templates to incorporate improvements
4. **Test Propagation**: Test changes after propagation to ensure they work as expected

### Resolving Conflicts

1. **Identify Conflicts**: Clearly identify conflicts between parent and child templates
2. **Prioritize Changes**: Determine which changes should take precedence
3. **Merge Carefully**: Carefully merge changes to maintain consistency
4. **Document Decisions**: Document decisions made during conflict resolution

## Implementation Notes

The current implementation of the inheritance mechanism is intentionally lightweight, focusing on metadata and linking rather than complex dependency management. This approach allows for flexibility and ease of use while still enabling the benefits of inheritance.

Future versions may introduce more sophisticated inheritance mechanisms, including:

1. **Semantic Versioning**: Better handling of version compatibility
2. **Automated Conflict Resolution**: More sophisticated tools for resolving conflicts
3. **Change Impact Analysis**: Tools for analyzing the impact of changes on the hierarchy
4. **Bidirectional Synchronization**: More automated bidirectional synchronization of changes

## Conclusion

The inheritance mechanism in Concrete provides a powerful way to create and maintain template hierarchies. By allowing templates to inherit from each other, it enables specialization while maintaining consistency and facilitating the propagation of improvements throughout the system.

---

*This is a living document. As the Concrete system evolves, this guide will be updated to reflect the latest best practices and features.* 