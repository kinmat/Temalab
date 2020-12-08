CREATE TABLE [dbo].[Tasks] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX) NULL,
    [CurrState]   NVARCHAR (20)  NULL,
    [DueDate]     DATETIME2 (7)  NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);