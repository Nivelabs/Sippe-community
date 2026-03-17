import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import type { Community } from "@/lib/mock-data";

function formatMembers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link href={`/c/${community.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
        {/* Cover Image */}
        <div className="relative h-44 overflow-hidden bg-muted">
          <img
            src={community.cover}
            alt={community.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={176}
          />
          {/* Rank Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-sm">
              #{community.rank}
            </span>
          </div>
          {/* Category */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-foreground backdrop-blur-sm">
              {community.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Avatar + Title */}
          <div className="flex items-start gap-3 mb-3">
            <img
              src={community.avatar}
              alt={community.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm shrink-0"
              width={40}
              height={40}
            />
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-1 group-hover:text-[#09090b] transition-colors">
                {community.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{community.owner}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
            {community.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span className="font-medium">{formatMembers(community.members)}</span>
              <span>membros</span>
            </div>
            <Badge
              className={
                community.price === 0
                  ? "bg-secondary text-secondary-foreground border-0 text-xs font-semibold"
                  : "bg-[#09090b]/10 text-[#09090b] border-0 text-xs font-semibold"
              }
            >
              {community.price === 0 ? "Grátis" : `R$ ${community.price}/mês`}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
