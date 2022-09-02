my %x;

while (<>) {
  if (/\[(\d+)\]/) {
      $x{$1}++;
  }
}

for my $k (sort { $a <=> $b } keys %x) {
  print "$k;$x{$k}\n";
}