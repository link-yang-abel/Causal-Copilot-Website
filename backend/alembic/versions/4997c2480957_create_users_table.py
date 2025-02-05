"""create users table

Revision ID: 4997c2480957
Revises: 
Create Date: 2025-02-05 15:04:53.681935

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4997c2480957'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        # sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('id', sa.INTEGER, primary_key=True),
        sa.Column('email', sa.VARCHAR(255), nullable=False, unique=True),
        sa.Column('name', sa.VARCHAR(255)),
        sa.Column('avatar_url', sa.VARCHAR(255)),
        sa.Column('oauth_id', sa.VARCHAR(255), unique=True),
        sa.Column('role_id', sa.VARCHAR(255)),
        sa.Column('created_at', sa.TIMESTAMP, server_default=sa.func.now()),
        sa.Column('modified_at', sa.TIMESTAMP, server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table('users')

